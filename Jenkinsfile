pipeline {
  agent any
  stages {

    stage('Killing'){
      steps {
        sh '''
        if [ $(docker ps -a -q) ]; then
        docker kill $(docker ps -a -q)
        docker rm $(docker ps -a -q)
       fi;
        '''
      }
    }

    stage('Cleaning') {
      steps{
          sh '''
          docker rmi res/auditor || true
          docker rmi res/musician || true
          docker rmi res/validate-music ||true
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