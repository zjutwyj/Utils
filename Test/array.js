/**
 * @description array
 * @namespace array
 * @author yongjin on 2014/7/3
 */


// 数组添加
var a = [];
//a[0] = 1;
//a[1] = 2;// 直接贼值
//console.log(a);


//a.push('1');
//a.push('a', 'b');
//a.push(['a', 'b']); // 在尾部插入 注意： 添加数组时，不是添加数组里的元素， 而是添加一个数组
//console.log(a);

//a.unshift('a'); // 在头部插入
//console.log(a);
//a.length = a.length + 1; // 在尾部插入一个'undefind' 值
//console.log(a[0]);


// 2、数组删除 // 用delete删除的元素  不改变数组的length长度, 删除后变成undefined
var a = [2, 1, 3];
//delete a[1];
//console.log(a);
//console.log(a.length);
//console.log(a[0]);
//console.log(a[1]);
//console.log(a[2]);

//a.pop(); // 从尾部弹出
//console.log(a);
//console.log(a.length);
//a.shift(); // 在头部弹出
//console.log(a);

// 3、遍历数组
//for(var i = 0, len = a.length; i < len; i++){
    //alert(a[i]);
//}
//console.log(a.join(' '));
//a.sort(function(left, right){
    //return left - right < 0;
//});
//console.log(a);
//var b = ['a', 'b', 3,  ['c', 'd']];
//a = a.concat(b);
//console.log(a);
//var result = a.slice(-1, -1);
//console.log(result);
//console.log(a);

//var result = a.splice(1);
//console.log(a);
//console.log(result);

//console.log(a.toLocalString());

// 4、数组方法 join(); reverse(); sort(); concat(); slice(); splice(); toString(); toLocalString();
// ECMScript 5中的方法 forEach(); map(); filter(); every(); some(); reduce(); reduceRight(); indexOf(); lastIndexOf(); Array.isArray([]); [].instanceof(Array);

// 万能函数splice(插入，删除， 替换)