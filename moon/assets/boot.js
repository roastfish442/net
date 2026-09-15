/**
 * 启动 —— 能力检测、读取存档、渲染首屏。
 */
(function () {
	'use strict';

	function start() {
		App.setup();

		var restored = App.restore();
		if (restored && App.nodeName() !== App.config.startNode) {
			App.holdForResume();
		}

		Views.init();

		// 点击返回键 / 侧滑返回时，优先关闭浮层
		window.addEventListener('keydown', function (e) {
			if (e.keyCode === 27) Views.closeLayer();
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
})();
