(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var wx = (global.wx = global.wx);

  var NxWxImage = nx.declare('nx.WxImage', {
    statics: {
      choose: function(inOptions) {
        return new Promise(function(resolve, reject) {
          if (global.__WEIXIN_READY___) {
            wx.chooseImage(
              nx.mix(inOptions, {
                success: function(data) {
                  resolve({ status: 'success', data: data });
                },
                fail: function(data) {
                  resolve({ status: 'fail', data: data });
                },
                complete: function(data) {
                  resolve({ status: 'complete', data: data });
                }
              })
            );
          } else {
            reject({
              status: 'fail',
              msg: '微信SDK还未初始化'
            });
          }
        });
      },
      preview: function(inCurrent, inItems) {
        var current = typeof inCurrent === 'number' ? inItems[inCurrent] : inCurrent;
        if (global.__WEIXIN_READY___) {
          wx.previewImage({ current: current, urls: inItems });
        }
      },
      upload: function(inId, inOptions) {
        return new Promise(function(resolve, reject) {
          if (global.__WEIXIN_READY___) {
            wx.uploadImage(
              nx.mix(inOptions, {
                localId: inId,
                success: function(data) {
                  resolve({ status: 'success', data: data });
                },
                fail: function(data) {
                  resolve({ status: 'fail', data: data });
                },
                complete: function(data) {
                  resolve({ status: 'complete', data: data });
                }
              })
            );
          } else {
            reject({
              status: 'fail',
              msg: '微信SDK还未初始化'
            });
          }
        });
      },
      uploads: function(inIds, inOptions) {
        var uploaders = inIds.map(function(id) {
          NxWxImage.upload(id, inOptions);
        });
        return Promise.all(uploaders).then(function(response) {
          var serverIds = response.map(function(item) {
            return item.data.serverId;
          });
          return new Promise(function(resolve) {
            resolve({ serverIds: serverIds, data: response });
          });
        });
      },
      download: function(inOptions) {
        return new Promise(function(resolve, reject) {
          if (global.__WEIXIN_READY___) {
            wx.downloadImage(
              nx.mix(inOptions, {
                success: function(data) {
                  resolve({ status: 'success', data: data });
                },
                fail: function(data) {
                  resolve({ status: 'fail', data: data });
                },
                complete: function(data) {
                  resolve({ status: 'complete', data: data });
                }
              })
            );
          } else {
            reject({
              status: 'fail',
              msg: '微信SDK还未初始化'
            });
          }
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWxImage;
  }
})();
