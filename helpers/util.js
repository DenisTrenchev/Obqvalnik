class Helpers{
	static checkAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			if(req.user.userRole == 1){
				return res.redirect("/users/dashboard");
			}
			if(req.user.userRole == 2){
				return res.redirect("/users/adminPanel");
			}
		}
		next();
	}

	static checkNotAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect("/users/login");
	}

	static isUser(req, res, next){
		if(req.user.userRole == 1){
			return res.redirect("/users/dashboard")
		}
		next();
	}
	static isAdmin(req, res, next){
		if(req.user.userRole == 2){
			return res.redirect("/users/adminPanel")
		}
		next();
	}
}

module.exports = Helpers;