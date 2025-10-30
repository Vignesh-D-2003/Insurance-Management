pipeline {
    agent any

    environment {
        // Docker Hub credentials (stored in Jenkins)
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKER_HUB_USER = "${DOCKER_HUB_CREDENTIALS_USR}"
        DOCKER_HUB_PASS = "${DOCKER_HUB_CREDENTIALS_PSW}"

        // Docker image names
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/insurance-frontend:latest"
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/insurance-backend:latest"

        // AWS EC2 instance details
        EC2_HOST = "ubuntu@54.164.59.117"   // ✅ Replace with your EC2 public IP
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "🔹 Checking out source code from GitHub..."
                git branch: 'main', url: 'https://github.com/Vignesh-D-2003/Insurance-Management.git'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                echo "⚙️ Building Spring Boot backend..."
                dir('insurance-backend-final') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend (Angular)') {
            steps {
                echo "🌐 Building Angular frontend..."
                dir('insurance-frontend-angular') {
                    sh 'npm install'
                    // ✅ Removed --configuration production
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🐳 Building Docker images for frontend and backend..."
                sh "docker build -t ${FRONTEND_IMAGE} ./insurance-frontend-final"
                sh "docker build -t ${BACKEND_IMAGE} ./insurance-backend-final"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "🚀 Pushing Docker images to Docker Hub..."
                sh """
                    echo "${DOCKER_HUB_PASS}" | docker login -u "${DOCKER_HUB_USER}" --password-stdin
                    docker push ${FRONTEND_IMAGE}
                    docker push ${BACKEND_IMAGE}
                    docker logout
                """
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo "🟢 Deploying containers on AWS EC2 via SSH..."
                sshagent(credentials: ['aws-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                            echo "🔹 Pulling updated Docker images..."
                            sudo docker pull ${FRONTEND_IMAGE}
                            sudo docker pull ${BACKEND_IMAGE}

                            echo "🔹 Stopping old containers (if running)..."
                            sudo docker stop frontend backend || true
                            sudo docker rm frontend backend || true

                            echo "🔹 Starting backend container..."
                            sudo docker run -d --name backend -p 8080:8080 ${BACKEND_IMAGE}

                            echo "🔹 Starting frontend container..."
                            sudo docker run -d --name frontend -p 80:80 ${FRONTEND_IMAGE}

                            echo "✅ Deployment completed successfully!"
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully!"
            echo "🌐 Frontend: http://${EC2_HOST.split('@')[1]}"
            echo "🔗 Backend:  http://${EC2_HOST.split('@')[1]}:8080"
        }
        failure {
            echo "❌ Pipeline failed. Please check Jenkins logs for details."
        }
    }
}
