(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var wx = global.wx = global.wx;

  var NxWxImage = nx.declare('nx.WxImage', {
    statics: {
      choose: function(inOptions){
        wx.ready(function () {
          return new Promise(function(resolve, _){
            wx.chooseImage(
              nx.mix( inOptions, {
                success: function( data ){
                  resolve( { status:'success', data: data} );
                },
                fail: function( data ){
                  resolve( { status:'fail', data: data} );
                },
                complete: function( data ){
                  resolve( { status:'complete', data: data } );
                }
              })
            )
          });
        });
      },
      preview: function(inIndex, inItems){
        var current = inItems[ inIndex ];
        wx.ready(function(){
          wx.previewImage({ current: current, urls: inItems });
        });
      },
      upload: function(inId, inOptions){
        wx.ready(function(){
          return new Promise(function( resolve, _ ){
            wx.uploadImage( nx.mix({
              localId: inId,
              success: function( data ){
                resolve( { status:'success', data: data} );
              },
              fail: function( data ){
                resolve( { status:'fail', data: data} );
              },
              complete: function( data ){
                resolve( { status:'complete', data: data } );
              }
            }, inOptions) );
          });
        });
      },
      uploads: function(inIds, inOptions){
        var self = this;
        var uploaders = nx.map( inIds, function(_, id){ self.upload( id, inOptions ); });
        return Promise.all( uploaders ).then(function(response){
          var serverIds = nx.map( response, function( _, item ){ return item.data.serverId; });
          return new Promise(function(resolve){
            resolve({ serverIds: serverIds, data: response });
          });
        });
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWxImage;
  }

}());
