pipeline {
  agent any
  stages {

    stage('Killing'){
      steps {
        sh 'docker kill $(docker ps -a -q)'
        sh 'docker rm $(docker ps -a -q)'
      }
    }

    stage('Cleaning') {
      steps{
          sh '''
          docker rmi res/auditor
          docker rmi res/musician
          docker rmi res/validate-music
          '''
      }
    }

    stage('Building') {
      steps {
        sh 'docker build --tag res/musician --file ./docker/image-musician/Dockerfile ./docker/image-musician/'
        sh 'docker build --tag res/auditor --file ./docker/image-auditor/Dockerfile ./docker/image-auditor/'
        sh 'docker build --tag res/validate-music --file ./docker/image-validation/Dockerfile ./docker/image-validation/'
      }
    }

    stage('validation') {
      steps {
        sh 'docker run --name res_validation -v /var/run/docker.sock:/var/run/docker.sock res/validate-music'
      }
    }
  }
}