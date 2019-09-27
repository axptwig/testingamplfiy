# Unicorn Flix - Walkthrough (v1 alpha)

Welcome to Unicorn Flix. Today you are going to be making a cat sharing platform to share all of your favorite cat videos with the world. We know how important cat videos are with cheering up everyone so this platform will be raise the world's moral by 1749% (Study to be done). You have been contracted to be the head developer of this platform and was told that you have to release this platform in one week. So in this workshop we will be building out the platform you need to start viewing your cat videos.

This workshop is split up into 3 parts:

**Setting up backend infrastructure** - You will be using the Amplify CLI to stand up the backend infrastructure combining the API, Auth and Video.

**Building the basic client** - You will be building out the basic client to communicate with the API to add and list the current videos

**Adding Auth** - You will be building out the Auth section to view the videos

## Setting up Development Enviroment

You just started at Unicorn Flix and they hooked you up with a brand new laptop - _sweeeet!_ Now let's configure your development environment. 

1. Clone the Unicorn Flix workshop by running `git clone https://github.com/wizage/UnicornFlix.git` or by downloading the zip [here](https://github.com/wizage/UnicornFlix/archive/master.zip)
1. Download and install Node and Node Package Manager (NPM) if you don't already have it from [nodejs.org](https://nodejs.org/en/download/). Select **LTS** for the node version.
1. Install AWS Amplify CLI using this command `npm install -g @aws-amplify/cli`
1. Install a custom AWS Amplify CLI livestream plugin by running `npm install amplify-category-video -g`

## Setting up backend infrastructure**
