![](/bqcore/bq/core/public/images/bqlogo_git.png)

***

## Overview 

BisQue is a web-based platform specifically designed to provide researchers with organizational and quantitative analysis tools for up to 5D image data. Users can extend BisQue by creating their own modules that take advantage of cutting edge machine learning algorithms. BisQue’s extensibility stems from two core concepts: flexible metadata facility and an open web-based architecture. Together these empower researchers to create, develop and share novel multimodal data analyses.

## Documentation

[__BisQue Documentation__](https://ucsb-vrl.github.io/bisqueUCSB/)

The official documentation covers the [BisQue cloud service](https://bisque.ece.ucsb.edu) running live at UCSB, module development for the platform, and the BQAPI. If you have any questions, feel free to reach out. We will be continuously updating the documentation so check back often for updates!

## Developing and Contributing 

This developer branch has (hopefully) everything you need to develop BisQue on your own. 

__Step 1. Clone Developer Repository__

```
git clone -b v0.7-Broccoli-beta --single-branch https://github.com/UCSB-VRL/bisqueUCSB.git
```

__Step 2. Start Developing!__

If the repo cloned successfully, you should see a directory structure like this:

```shell
amil@amil:~/bisqueUCSB$ ls
.
├── boot
├── bqapi
├── bqcore
├── bqengine
├── bqfeature
├── bqserver
├── builder
├── config-defaults
├── contrib
├── COPYRIGHT
├── Dockerfile.caffe.xenial
├── docs
├── entry.sh
├── LICENSE
├── Makefile
├── migrations
├── modules
├── pavement.py
├── paver-minilib.zip
├── pytest-bisque
├── pytest.ini
├── README.md
├── requirements.txt
├── run-bisque.sh
├── setup.py
├── sources.list
├── start-bisque.sh
├── tools
└── virtualenv.sh

14 directories, 15 files

```

Now you are all set! Okay, maybe that's too easy. Depending on whether you want to develop the source code itself, then you are good to go. We highly reccommend, however, using Docker to assit in providing an environment to develop. In that case, we need to build the container.

__Step 3. Build the Container__

To build the BisQue docker image, we provided `Dockerfile.caffe.xenial` to ease the pain of making your own. In the directory where you cloned the repo, run the following command to tag and build the image:

```
docker build -t bisque-developer-beta:0.7-broccolli -f Dockerfile.caffe.xenial .
```

I have attached a log file `DOCKER-BUILD_LOG.md` of what you should see as the build progresses throughout various scripts. If anything fails, feel free to file an issue.


__Step 4. Run the Container__

Let's verify that your container built successfully. To run the container, run the following command:

```
docker run -itp 8080:8080 --rm --name bisque bisque-developer-beta:0.7-broccolli
```

Go to your web browser and navigate to `localhost:8080` and you should see BisQue in all its glory. I have attached a docker run log script as well.

__Step 4. Develop in the Container__

If you want to start the bisque `virtualenv`, you can activate it by running

```
source /usr/lib/bisque/bin/activate
```
We use TurboGears2 as our stack of choice. All of the `config` files live in `config-defaults`.


## Developers

* Amil Khan  (BisQue Team)
* Satish Kumar  (BisQue Team)
* Griffin Danninger
* Mike Goebel

### Built With
* Docker
* ExtJS (UI)
* Imaris Convert (Image Service)
* OpenSlide (Image Service)
* Bio-Formats (Image Service)
* FFMpeg (Image Service)
* libTIFF (Image Service)
* TurboGears (backend)
* SQLAlchemy (backend)

### Acknowledgments

* Kristian Kvilekval, Dmitry Fedorov, Christian Lang 
* NSF SI2-SSI No.1664172, NSF MCB Grant No. 1715544
* Cyverse at University of Arizona
