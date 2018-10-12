(function () {

  var global = global || this || window || Function("return this")();
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
            );
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
            wx.uploadImage(
              nx.mix( inOptions, {
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
              })
            );
          });
        });
      },
      uploads: function(inIds, inOptions){
        var uploaders = inIds.map(function(id){ NxWxImage.upload( id, inOptions ); });
        return Promise.all( uploaders ).then(function(response){
          var serverIds = response.map( function( item ){ return item.data.serverId; });
          return new Promise(function(resolve){
            resolve({ serverIds: serverIds, data: response });
          });
        });
      },
      download: function(inOptions){
        wx.ready(function () {
          return new Promise(function(resolve, _){
            wx.downloadImage(
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
            );
          });
        });
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWxImage;
  }

}());
