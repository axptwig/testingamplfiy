import React from 'react';
import videojs from 'video.js';
import XhrFunction2 from './xhr';
import { Storage } from 'aws-amplify';
import { optionalCallExpression } from '@babel/types';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    Storage.configure({
      AWSS3: {
          bucket: 'unicornflixwstest-dev-output',
          region: 'us-west-2'
      }
    });

    // videojs.Hls.xhr((options) => {          
    //   const storageOptions = {
    //     customPrefix: {
    //       public: 'output/'
    //     }
    //   };
    //   const urlSplit = options.uri.split('/');
    //   console.log(options);
    //   options.uri = Storage.get(urlSplit[urlSplit.length-1], storageOptions);;
    //   return options;
    // }, function(error, response) {
    //   console.log(response);
    // })


    
    
    // videojs.Hls.xhr.beforeRequest = function(options) {
    //   console.log(options.uri);
    //   options.beforeSend = function(request) {
    //     console.log(request);
    //     const storageOptions = {
    //       customPrefix: {
    //         public: 'output/'
    //       }
    //     };
    //     const urlSplit = request.url.split('/');
        
  
    //     request.url = Storage.get(urlSplit[urlSplit.length-1], storageOptions);
        
    //   }
    //   if (options.uri.includes('SampleVideo_1280x720_1mb.m3u8')){
    //     return;
    //   }
    //   //Calls to Storage
     
    //   return options;
    // };

    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
      this.tech_.hls.xhr = XhrFunction2;
    });
    
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}