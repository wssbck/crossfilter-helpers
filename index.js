var crossfilterh=function(n){"use strict";return n.count=function(){return{add:function(n){return n.count++,n},rem:function(n){return n.count--,n},ini:function(){return{count:0}},acc:function(n){return n.count}}},n.sum=function(n){return{add:function(t,r){return t.sum+=n(r),t},rem:function(t,r){return t.sum-=n(r),t},ini:function(){return{sum:0}},acc:function(n){return n.sum}}},n.product=function(n){return{add:function(t,r){return t.product*=n(r),t},rem:function(t,r){return t.product=0!=n(r)?t.product/n(r):t.product,t},ini:function(){return{product:1}},acc:function(n){return n.product}}},n.max=function(n){return{add:function(t,r){return t.max=n(r)>t.max?n(r):t.max,t},rem:function(t,r){return t.max=n(r)>t.max?n(r):t.max,t},ini:function(){return{max:-1/0}},acc:function(n){return n.max}}},n.min=function(n){return{add:function(t,r){return t.min=n(r)<t.min?n(r):t.min,t},rem:function(t,r){return t.min=n(r)<t.min?n(r):t.min,t},ini:function(){return{min:1/0}},acc:function(n){return n.min}}},n.mean=function(t,r){var u="undefined"==typeof r?n.helper_constant(1):r;return{add:function(n,r){return n.sum+=t(r)*u(r),n.count+=u(r),n.mean=n.count?n.sum/n.count:0,n},rem:function(n,r){return n.sum-=t(r)*u(r),n.count-=u(r),n.mean=n.count?n.sum/n.count:0,n},ini:function(){return{count:0,sum:0,mean:0}},acc:function(n){return n.mean}}},n}(crossfilterh||{});module.exports=crossfilterh;var crossfilterh=function(n){"use strict";return n.helper_accessor=function(n){return"function"!=typeof n?function(t){return t[n]}:n},n.helper_constant=function(n){return function(){return n}},n}(crossfilterh||{});module.exports=crossfilterh;