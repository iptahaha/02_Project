"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
function logout() {
    fetch('/auth/logout', {
        method: 'DELETE',
    }).then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
            return true;
        }
    });
}
exports.logout = logout;
//# sourceMappingURL=logoutLogic.js.map