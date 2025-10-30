# Login Not Working - Complete Fix

## Current Status
❌ Login failing for all users
❌ Backend returning: "Invalid username or password"
❌ Database not loading users from data.sql

## Root Cause
Backend is running but data.sql is not being executed, so no users exist in database.

## Complete Fix Steps

### Step 1: Stop Backend
```bash
# Press Ctrl+C in backend terminal
# OR
taskkill /F /IM java.exe
```

### Step 2: Verify Files Are Updated

#### File 1: application.properties ✅
**Location**: `insurance-backend-final/src/main/resources/application.properties`

**Must have:**
```properties
spring.jpa.hibernate.ddl-auto=create-drop
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true
```

#### File 2: data.sql ✅
**Location**: `insurance-backend-final/src/main/resources/data.sql`

**Must have correct password hashes:**
```sql
-- admin password: admin123
('admin', 'admin@insurance.com', '$2a$10$1bZLO2elrCSjCfO2wv6QvevqTttDFwbbZYMiZDaczg9j6wx8qSeeu', ...)

-- john_doe password: password
('john_doe', 'john@example.com', '$2a$10$m7gta7UCW8bRi9dLQm8d3.lQ5.1CDDIHG51MFUrU9UHgB8TI8fFb.', ...)

-- vignesh password: vignesh2003
('vignesh', 'vignesh2003@gmail.com', '$2a$10$3jBC6EYfWfFM4Sp3T1rLre7s7FtlGtOBfhKHkK51wOenuwdJH2tem', ...)
```

#### File 3: AuthController.java ✅
**Location**: `insurance-backend-final/src/main/java/com/insurance/controller/AuthController.java`

**Must NOT have hardcoded admin check:**
```java
@PostMapping("/login")
public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
    try {
        String jwt = authService.authenticateUser(loginRequest);
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(new JwtResponse(...));
    } catch (Exception e) {
        return ResponseEntity.status(401).body(new MessageResponse("Invalid username or password"));
    }
}
```

### Step 3: Clean Build (Important!)
```bash
cd "h:/Guvi Final/insurance-backend-final"
mvn clean
```

### Step 4: Start Backend
```bash
mvn spring-boot:run
```

### Step 5: Verify Data Loaded

**Watch backend logs for:**
```
Hibernate: insert into users ...
Hibernate: insert into users ...
Hibernate: insert into users ...
Hibernate: insert into users ...
```

**Should see 4 INSERT statements (admin + 3 customers)**

### Step 6: Test Backend Directly

```bash
# Test 1: Check users exist
curl http://localhost:8080/api/statistics/dashboard

# Should show: "totalCustomers": 3 or 4

# Test 2: Try login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"vignesh","password":"vignesh2003"}'

# Should return JWT token, NOT "Invalid username or password"
```

### Step 7: Test Frontend

1. Open: http://localhost:4200
2. Try login: vignesh / vignesh2003
3. Should redirect to dashboard

## Quick Fix Script

**Run this:**
```bash
Double-click: FIX-LOGIN-NOW.bat
```

This will:
1. Stop backend
2. Start backend with clean database
3. Test login automatically

## Verification Checklist

After restart, verify:

- [ ] Backend started without errors
- [ ] Logs show "insert into users" (4 times)
- [ ] `curl http://localhost:8080/api/statistics/dashboard` shows totalCustomers > 0
- [ ] Login test returns JWT token
- [ ] Frontend login works

## If Still Not Working

### Check 1: Backend Logs
Look for errors like:
- "Table users not found"
- "SQL syntax error"
- "Failed to execute SQL script"

### Check 2: H2 Console
```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:insurance_db
Username: sa
Password: password

Query: SELECT COUNT(*) FROM users;
Expected: 4
```

### Check 3: Clean Everything
```bash
cd insurance-backend-final
mvn clean
rm -rf target/
mvn spring-boot:run
```

## Common Issues

### Issue 1: "Table users not found"
**Solution**: 
- Check `spring.jpa.hibernate.ddl-auto=create-drop`
- Restart backend

### Issue 2: "No users in database"
**Solution**:
- Check `spring.sql.init.mode=always`
- Check `spring.jpa.defer-datasource-initialization=true`
- Restart backend

### Issue 3: "Bad credentials"
**Solution**:
- Password hashes must match exactly
- Check data.sql has correct hashes
- Restart backend

## Files Modified Summary

1. ✅ `application.properties` - Added defer-datasource-initialization
2. ✅ `data.sql` - Updated password hashes
3. ✅ `AuthController.java` - Removed hardcoded admin check
4. ✅ `schema.sql` - Removed DROP statements

## Test Credentials

| Username | Password | Expected Result |
|----------|----------|-----------------|
| admin | admin123 | ✅ Login success |
| john_doe | password | ✅ Login success |
| jane_smith | password | ✅ Login success |
| vignesh | vignesh2003 | ✅ Login success |

## Critical Notes

⚠️ **Backend MUST be restarted** - Changes only apply on restart
⚠️ **Database is in-memory** - Data resets on each restart
⚠️ **Clean build recommended** - `mvn clean` before restart

## Success Indicators

✅ Backend logs show: "insert into users" (4 times)
✅ Dashboard API shows: totalCustomers > 0
✅ Login returns JWT token
✅ Frontend redirects to dashboard

---

**Status**: Ready to fix
**Action Required**: Restart backend with clean build
**Expected Time**: 2-3 minutes
