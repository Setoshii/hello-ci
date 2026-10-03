pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    tools {
        nodejs 'node20'
    }

    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Web App') {
            steps {
                sh 'nohup node src/app.js > app.log 2>&1 &'
                sh 'sleep 3'
            }
        }

        stage('Test') {
            steps {
                sh 'npx jest tests/math.test.js'
            }
        }

        stage('UI Test') {
            steps {
                sh 'npx jest tests/e2e/home.test.js --runInBand --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit 'junit.xml'
        }
    }
}