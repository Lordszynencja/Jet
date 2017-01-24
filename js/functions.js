function prettyDatesDifference(d1, d2) {
	console.log(((d2 - d1)/1000).toFixed(3) + " seconds");
}

function shadow(xy,tan) {
	return xy[0]-tan*xy[1];
}

function shadow2(xy,tan) {
	return xy[1];
}

function normalize(vector) {
	var l = 0;
	for (var i in vector) l += vector[i]*vector[i];
	var vect = [];
	l = Math.sqrt(l);
	for (var i in vector) vect[i] = vector[i]/l;
	return vect;
}

function angle(x,y) {
	var d = Math.sqrt(x*x+y*y);
	return (x>0 ? Math.asin(y/d) : Math.PI-Math.asin(y/d));
}

function check(x,x1,x2) {
	return ((x>x1 && x>x2) || (x<x1 && x<x2));
}

function crossProduct(p1,p2,p3) {
	return (p2[0]-p1[0])*(p3[1]-p1[1])-(p2[1]-p1[1])*(p3[0]-p1[0]);
}

function dist(p1,p2) {
	var dx = p1[0]-p2[0];
	var dy = p1[1]-p2[1];
	return Math.sqrt(dx*dx+dy*dy);
}

function cross(l1,l2) {//l1 and l2 are [x1,y1][x2,y2]
	var dx1 = l1[1][0]-l1[0][0];
	var dy1 = l1[1][1]-l1[0][1];
	var dx2 = l2[1][0]-l2[0][0];
	var dy2 = l2[1][1]-l2[0][1];
	if (dx1==0) {
		if (dx2==0) {
			return false;
		} else {
			var a = dy2/dx2;
			var b = l2[0][1]-a*l2[0][0];
			var x = l1[0][0];
			var p = [x,a*x+b];
			if (check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		}
	} else {
		if (dx2==0) {
			var a = dy1/dx1;
			var b = l1[0][1]-a*l1[0][0];
			var x = l2[0][0];
			var p = [x,a*x+b];
			if (check(x,l1[0][0],l1[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} else {
			var a1 = dy1/dx1;
			var b1 = l1[0][1]-a1*l1[0][0];
			var a2 = dy2/dx2;
			var b2 = l2[0][1]-a2*l2[0][0];
			if (a1==a2) return false;
			var x = (b2-b1)/(a1-a2);
			var p = [x,a1*x+b1];
			if (check(x,l1[0][0],l1[1][0]) || check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} 
	}
	return false;
}

function collide(v1,v2) {//v1 & v2 must be convex hulls with vertices in order
	var i,s,s1;
	var l1 = v1.length;
	var l2 = v2.length;
	for (s=0;s<l1;s++) {
		var s1 = (s+1)%l1;
		var x1 = v1[s][0];
		var x2 = v1[s1][0];
		var y1 = v1[s][1];
		var y2 = v1[s1][1];
		var sfun;
		var tan;
		if (y1 == y2) {
			sfun = shadow2;
			tan = 0;
		} else {	
			sfun = shadow;
			tan = (x2-x1)/(y2-y1);
		}
		var max = sfun(v1[0],tan);
		var min = max;
	  
		for (i=1;i<l1;i++) {
			var val = sfun(v1[i],tan);
			if (val<min) min = val;
			else if (val>max) max = val;
		}
	  
		var on_left = false;
		var on_right = false;
	  
		for (i=0;i<l2;i++) {
			var val = sfun(v2[i],tan);
			if (val>=min) on_right = true;
			if (val<=max) on_left = true;
		}
		if (!on_left || !on_right) return false;
	}
               
	for (s=0;s<l2;s++) {
		var s1 = (s+1)%l2;
		var x1 = v2[s][0];
		var x2 = v2[s1][0];
		var y1 = v2[s][1];
		var y2 = v2[s1][1];
		var sfun;
		var tan;
		if (y1 == y2) {
			sfun = shadow2;
			tan = 0;
		} else {	
			sfun = shadow;
			tan = (x2-x1)/(y2-y1);
		}
		var max = sfun(v2[0],tan);
		var min = max;
	  
		for (i=1;i<l2;i++) {
			var val = sfun(v2[i],tan);
			if (val<min) min = val;
			else if (val>max) max = val;
		}
	  
		var on_left = false;
		var on_right = false;
	  
		for (i=0;i<l1;i++) {
			var val = sfun(v1[i],tan);
			if (val>=min) on_right = true;
			if (val<=max) on_left = true;
		}
		if (!on_left || !on_right) return false;
	}
	return true;
}

function cleanArray(arr) {
  var newArray = new Array();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != null && arr[i] != undefined) {
      newArray.push(arr[i]);
	  newArray[newArray.length-1].num = newArray.length-1;
    }
  }
  return newArray;
}

function save(name, object) {
	localStorage[name] = JSON.stringify(object);
}

function load(name) {
	var objectJSON = localStorage[name];
	if (objectJSON) {
		return JSON.parse(objectJSON);
	}
	return undefined;
}
