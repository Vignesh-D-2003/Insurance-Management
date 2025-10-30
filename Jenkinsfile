pipeline {
    agent any

    environment {
        // Docker Hub credentials
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKER_HUB_USER = "${DOCKER_HUB_CREDENTIALS_USR}"
        DOCKER_HUB_PASS = "${DOCKER_HUB_CREDENTIALS_PSW}"

        // Docker image names
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/insurance-frontend:latest"
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/insurance-backend:latest"

        // AWS EC2 details
        EC2_HOST = "ubuntu@<your-ec2-public-ip>"  // Replace with actual EC2 IP
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "🔹 Checking out source code from GitHub..."
                git branch: 'main', url: 'https://github.com/<your-username>/insurance-management-system.git'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                echo "🔹 Building Spring Boot backend..."
                dir('insurance-backend-final') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend (Angular)') {
            steps {
                echo "🔹 Building Angular frontend..."
                dir('insurance-frontend-final') {
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🐳 Building Docker images for frontend & backend..."
                sh "docker build -t ${FRONTEND_IMAGE} ./insurance-frontend-final"
                sh "docker build -t ${BACKEND_IMAGE} ./insurance-backend-final"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "🚀 Pushing Docker images to Docker Hub..."
                sh """
                    echo ${DOCKER_HUB_PASS} | docker login -u ${DOCKER_HUB_USER} --password-stdin
                    docker push ${FRONTEND_IMAGE}
                    docker push ${BACKEND_IMAGE}
                    docker logout
                """
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo "🟢 Deploying application to AWS EC2 via SSH..."
                sshagent (credentials: ['aws-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                            echo "🔹 Pulling new Docker images..."
                            sudo docker pull ${FRONTEND_IMAGE}
                            sudo docker pull ${BACKEND_IMAGE}

                            echo "🔹 Stopping existing containers..."
                            sudo docker stop frontend backend || true
                            sudo docker rm frontend backend || true

                            echo "🔹 Starting backend..."
                            sudo docker run -d --name backend -p 8080:8080 ${BACKEND_IMAGE}

                            echo "🔹 Starting frontend..."
                            sudo docker run -d --name frontend -p 4200:80 ${FRONTEND_IMAGE}

                            echo "✅ Deployment successful!"
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully! Visit your app at:"
            echo "   🌐 Frontend: http://<your-ec2-public-ip>:4200"
            echo "   🔗 Backend: http://<your-ec2-public-ip>:8080"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins logs for details."
        }
    }
}
