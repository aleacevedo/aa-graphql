pipeline{
  agent any
  stages {
    stage('DB'){
      stpes{
        sh 'echo "Create DB"'
        sh 'echo "Migrates DB"'
      }
    }
    stage('Run'){
      steps{
        sh 'echo "npm start"'
        sh 'echo "npx apollo service:check"'
      }
    }
    stage('Test'){
      steps{
        sh 'echo "npm test"'
      }
    }
  }
}