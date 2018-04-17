
# [demo展示](http://shirley5li.me/2018-contest/index.html) #


# 2048小游戏原理 #
用javascript和jQuery来写游戏逻辑，样式的话也没有使用样式库，用的纯粹的CSS。
## 布局 ##
主要是布置4*4的16个小方块，当按上下左右的方向键时，所有的数字就会朝所按方向键的方向移动，就像俄罗斯方块一样，相邻的相同数字会合并为更大的数字，每按方向键移动一次，就会增加一个数字。当16个小方块中都填满了数字，且按方向键无法合并时，游戏结束。

## 样式 ##
先将结构和静态样式写出，如下所示，在添加游戏逻辑过程中，需要类名什么的再添加，样式再稍作调整。

当前阶段结构及样式如下：

![2048游戏结构及样式阶段示意图](http://ou3oh86t1.bkt.clouddn.com/github/360%E5%89%8D%E7%AB%AF%E6%98%9F%E6%8A%80%E6%9C%AF%E6%B5%8B%E8%AF%84/2048%E6%B8%B8%E6%88%8F/2048%E6%B8%B8%E6%88%8F%E7%BB%93%E6%9E%84%E5%8F%8A%E6%A0%B7%E5%BC%8F%E9%98%B6%E6%AE%B5%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

## 游戏逻辑 ##
为了防止全局变量的污染，创建一个GAME对象，包括如下方法，负责处理盒子中数字的移动及合并，以及每次移动后产生随机数字2或者4，并且刷新不同数字对应的盒子的背景色。

``` js
	var GAME = {
	
		// 游戏初始化
		init: function() {
		
		},
		
		// 再来一次游戏刷新
		playAgain: function() {
		
		},
		
		// 随机生成一个新数字
		newRandom: function() {
		
		},
		
		// 刷新盒子的背景色
		refreshColor: function() {
		
		},
		
		// 获取到当前盒子旁边的盒子
		getSideBox: function() {
		
		},
		
		// 移动当前盒子
		boxMove: function() {
		
		},
		
		//整体移动
		move: function() {
		
		},
		
		//判断游戏是否结束
		isGameOver: function() {
		
		}
		
	};
```

然后初始化游戏，监听再来一次按钮的点击事件，以及监听键盘的方向键触发盒子移动，适配移动端的手指滑动触发盒子移动。

# 待解决问题 #
1、页面滚动问题

在google浏览器的手机模拟器中滑动时不会出现y方向的滚动，但是在手机端打开小游戏的github pages页面时，在y方向上滑动时，页面会滚动，有点影响游戏体验，尝试了将body的样式设置为`height:100%;overflow:hidden;`，但还是会滚动。目前还没找到怎么禁止y方向滚动的办法。希望有了解的小伙伴给与解答。

2、页面缩放问题

我在html文档头部使用了`<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0,user-scalable=0">`，但在手机端还是可以双击放大，缩放问题也有些影响体验，同样希望有了解的小伙伴留下issues。