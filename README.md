# SeqoneTV
## A technical test for Seq.one

## Based on :
- Angular/cli 
- Nodejs 
- Docker 
- Mysql


###### Dependencies :
- Docker
- Docker-compose
- Angular/cli
- Nodejs
- Mysql

## For build the project type the following command line
###### Install
###### First clone the depo 
```bash
git clone https://github.com/tashikomaaa/SeqoneTV.git
```

###### Go to the project folder
```bash
cd SeqoneTV/
```
###### Start
###### Give the execution right to the install.sh file
```bash
sudo chmod +x install.sh && ./install.sh
```

###### Go to mean-docker folder
```bash
cd mean-docker/
```

###### Start the docker daemon
```bash
sudo dockerd
```

###### Now run the build with :
```bash
docker-compose up --build
```
###### Feed
### you need to feed the db all the day (the cron is on the road)
###### Go to the url
```url
http://localhost:3000/dataFeed/
```

## Now enjoy this no finish project



