(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var wx = global.wx = global.wx;

  var NxWxImage = nx.declare('nx.WxImage', {
    statics: {
      choose: function(inOptions){
        wx.ready(function () {
          return new Promise(function(resove, _){
            wx.chooseImage(
              nx.mix( inOptions, {
                success: function( data ){
                  resove( { status:'success', data: data} );
                },
                fail: function( data ){
                  resove( { status:'fail', data: data} );
                },
                complete: function( data ){
                  resolve( { status:'complete', data: data } )
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
