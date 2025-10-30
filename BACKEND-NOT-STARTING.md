# Backend Not Starting - Troubleshooting Guide

## Quick Fix Steps

### Step 1: Start Backend with Debug
```bash
Double-click: START-BACKEND-DEBUG.bat
```

This will:
- Show all startup logs
- Display any errors
- Keep window open if it crashes

### Step 2: Check for Common Issues

#### Issue 1: Port 8080 Already in Use
**Symptoms**: "Port 8080 is already in use"

**Fix**:
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /F /PID <PID>

# Or kill all Java processes
taskkill /F /IM java.exe
```

#### Issue 2: Java Not Found
**Symptoms**: "java is not recognized"

**Fix**:
```bash
# Check Java version
java -version

# Should show Java 17 or higher
# If not, install Java 17 JDK
```

#### Issue 3: Maven Not Found
**Symptoms**: "mvn is not recognized"

**Fix**:
- Install Maven
- Add to PATH
- Or use: `mvnw spring-boot:run` (Maven wrapper)

#### Issue 4: Compilation Errors
**Symptoms**: "BUILD FAILURE" during startup

**Fix**:
```bash
cd insurance-backend-final
mvn clean compile
# Check output for errors
```

### Step 3: Manual Start

```bash
cd "h:/Guvi Final/insurance-backend-final"
mvn clean
mvn spring-boot:run
```

### Step 4: Verify Backend Started

**Check 1: Look for this in logs:**
```
Started Application in X.XXX seconds
```

**Check 2: Test endpoint:**
```bash
curl http://localhost:8080/api/statistics/dashboard
```

**Check 3: Open in browser:**
```
http://localhost:8080/h2-console
```

## Common Startup Errors

### Error 1: "Failed to configure a DataSource"
**Cause**: Database configuration issue

**Fix**: Check `application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:insurance_db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
```

### Error 2: "Table 'USERS' not found"
**Cause**: Schema not created

**Fix**: Check `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=create-drop
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true
```

### Error 3: "Failed to execute SQL script"
**Cause**: Syntax error in data.sql or schema.sql

**Fix**: 
- Check data.sql for syntax errors
- Ensure all SQL statements end with semicolon
- Check for special characters in strings

### Error 4: "Port 8080 is already in use"
**Cause**: Another process using port 8080

**Fix**:
```bash
# Kill all Java processes
taskkill /F /IM java.exe

# Or change port in application.properties
server.port=8081
```

### Error 5: "ClassNotFoundException"
**Cause**: Missing dependencies

**Fix**:
```bash
mvn clean install
mvn spring-boot:run
```

## Detailed Startup Process

### What Should Happen:

1. **Maven downloads dependencies** (first time only)
2. **Compiles Java files**
3. **Starts Spring Boot**
4. **Creates H2 database**
5. **Runs schema.sql** (creates tables)
6. **Runs data.sql** (inserts data)
7. **Application ready** on port 8080

### Expected Logs:

```
[INFO] Building Insurance Management System 1.0.0
[INFO] Compiling 66 source files
[INFO] 
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

Starting Application...
Hibernate: create table users ...
Hibernate: create table insurance_policies ...
Hibernate: insert into users ...
Started Application in 5.234 seconds
```

## If Backend Still Won't Start

### Option 1: Check Logs Carefully
Look for the FIRST error message, not the last one.

### Option 2: Clean Everything
```bash
cd insurance-backend-final
rmdir /s /q target
mvn clean install
mvn spring-boot:run
```

### Option 3: Check Java Version
```bash
java -version
# Must be Java 17 or higher
```

### Option 4: Check Maven Version
```bash
mvn -version
# Should show Maven 3.6+
```

### Option 5: Use IDE
- Open project in IntelliJ IDEA or Eclipse
- Run as Spring Boot Application
- Check console for errors

## Quick Checklist

Before starting backend, verify:

- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] Port 8080 free
- [ ] No other Java processes running
- [ ] In correct directory: `insurance-backend-final`
- [ ] `pom.xml` exists
- [ ] `src/main/java` exists
- [ ] `application.properties` exists

## Success Indicators

✅ Backend started successfully if you see:
- "Started Application in X seconds"
- No error messages
- Can access: http://localhost:8080/h2-console
- Can access: http://localhost:8080/api/statistics/dashboard

## Get Help

If still not working:

1. Run: `START-BACKEND-DEBUG.bat`
2. Copy the error message
3. Check the FIRST error (scroll up)
4. Look for:
   - "Error creating bean"
   - "Failed to configure"
   - "ClassNotFoundException"
   - "SQLException"

---

**Most Common Fix**: Kill all Java processes and restart
```bash
taskkill /F /IM java.exe
cd insurance-backend-final
mvn spring-boot:run
```
