pipeline {
  agent any
  stages {
    stage('validation') {
      steps {
        sh '''./validate.sh
'''
      }
    }
    stage('ending') {
      steps {
        sh '''docker run -d -p 2205:2205 res/auditor

'''
        sh ' docker run -d res/musician piano'
      }
    }
    stage('Build') {
      steps {
        sh '''docker build --tag res/musician --file ./docker/image-musician/Dockerfile ./docker/image-musician/
'''
        sh '''docker build --tag res/auditor --file ./docker/image-auditor/Dockerfile ./docker/image-auditor/
'''
      }
    }
    stage('manual') {
      steps {
        sh 'docker run --name res_validation -v /var/run/docker.sock:/var/run/docker.sock res/validate-music'
      }
    }
  }
}