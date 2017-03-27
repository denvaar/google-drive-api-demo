export const ICONS = { 
  'application/vnd.google-apps.spreadsheet': "fa fa-2x fa-table",
  'application/vnd.google-apps.document':    "fa fa-2x fa-file-text-o",
  'application/pdf':                         "fa fa-2x fa-file-pdf-o",
  'application/vnd.google-apps.drawing':     "fa fa-2x fa-paint-brush",
  'application/vnd.google-apps.presentation':"fa fa-2x fa-file-powerpoint-o",
  'image/png':                               "fa fa-2x fa-file-image-o",
  'image/jpg':                               "fa fa-2x fa-file-image-o",
  'image/jpeg':                              "fa fa-2x fa-file-image-o",
  'video/mp4':                               "fa fa-2x fa-file-video-o"
}

export const humanFileSize = (bytes, si) => {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }   
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1; 
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1); 
    return bytes.toFixed(1)+' '+units[u];
}
