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

        stage('Test') {
            steps {
                sh 'npm test'
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