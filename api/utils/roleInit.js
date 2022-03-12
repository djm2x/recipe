function initial(){
	Role.count( (err, count) => {
		if(!err && count === 0) {
			// USER Role ->
			new Role({
				name: 'USER'
			}).save( err => {
				if(err) return console.error(err.stack)
				console.log("USER_ROLE is added")
			});
 
			// ADMIN Role ->
			new Role({
				name: 'ADMIN'
			}).save( err => {
				if(err) return console.error(err.stack)
				console.log("ADMIN_ROLE is added")
			});
 
			// PM Role ->
			new Role({
				name: 'PM'
			}).save(err => {
				if(err) return console.error(err.stack)
				console.log("PM_ROLE is added")
			});
		}
	});
}