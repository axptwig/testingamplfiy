/**
 * @file xhr.js
 */

/**
 * A wrapper for videojs.xhr that tracks bandwidth.
 *
 * @param {Object} options options for the XHR
 * @param {Function} callback the callback to call when done
 * @return {Request} the xhr request that is going to be made
 */
import videojs from 'video.js';
import { Storage } from 'aws-amplify';

const {
  xhr: videojsXHR,
  mergeOptions
} = videojs;

function XhrFunction2(options, callback) {
  const storageOptions = {
    customPrefix: {
      public: 'output/'
    }
  };
  const urlSplit = options.uri.split('/');
  options.beforeSend = async (xhr) => {
    console.log(xhr);
    const urlSplit = xhr.url.split('/');
    xhr.url = await Storage.get(urlSplit[urlSplit.length-1], storageOptions);
  }
  return videojs.Hls.xhr(options,callback);
}

export default XhrFunction2;

