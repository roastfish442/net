/**
 * 主题 —— 只做一件事：把选中的主题写进 <html data-theme="…">，具体配色在 style.css 里。
 *
 * 放在 <head> 里最先执行，这样首屏渲染时就是对的主题，不会闪一下再变。
 * 主题名与两套配色见 style.css 的 :root 与 html[data-theme="paper"]。
 */
(function () {
	'use strict';

	var KEY = 'wyl.theme';
	var IDS = ['moon', 'paper'];
	var DEFAULT = 'moon';

	function saved() {
		try {
			return window.localStorage.getItem(KEY);
		} catch (e) {
			return null;   // 隐私模式等读不到就用默认
		}
	}

	function apply(id) {
		document.documentElement.setAttribute('data-theme', id);
	}

	var current = saved();
	if (IDS.indexOf(current) < 0) current = DEFAULT;
	apply(current);

	window.WYL_THEME = {
		key: KEY,
		ids: IDS,
		current: function () {
			return document.documentElement.getAttribute('data-theme') || DEFAULT;
		},
		set: function (id) {
			if (IDS.indexOf(id) < 0) return false;
			apply(id);
			try {
				window.localStorage.setItem(KEY, id);
			} catch (e) { /* 存不了也没关系，本次会话内有效 */ }
			return true;
		}
	};
})();
