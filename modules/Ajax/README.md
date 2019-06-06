# Ajax
For send http request

## Usage
### get
Prototype `get(url, data, s, e)`
- url: _Request url_
- data: _Request data_
- s: _Callback function after successful request_
- e: _Callback function after request error_
### post
Prototype `post(url, data, s, e)`
- url: _Request url_
- data: _Request data_
- s: _Callback function after successful request_
- e: _Callback function after request error_

### ajax
Prototype `ajax({ type = "get", success, error, data, url, sync = false })`
- type: _Request type_
- url: _Request url_
- data: _Request data_
- success: _Callback function after successful request_
- error: _Callback function after request error_
- sync: _Blocking (returning a Promise) or Non-blocking_

### JSONP
Prototype `JSONP({url, data, success, error, name = "JSONP_CALLBACK", sync = false, outTime = 10000})`
- name: _JSONP callback function name_
- url: _Request url_
- data: _Request data_
- success: _Callback function after successful request_
- error: _Callback function after request error_
- sync: _Blocking (returning a Promise) or Non-blocking_
- outTime: _Maximum request waiting time_
