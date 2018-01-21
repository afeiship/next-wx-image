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
      preview: function(inOptions){
        wx.ready(function(){
          wx.previewImage(inOptions);
        });
      },
      upload: function(){}
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWxImage;
  }

}());
