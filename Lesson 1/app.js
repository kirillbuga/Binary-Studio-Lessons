var app = app || {};

(function() {
	var Student = new app.Model({
		props: {
			name: 'Piotr',
			age: 22,
			year: 5,
			examsTaken: 2,
		},
		takeExam: function(){
			this.set('examsTaken', this.get('examsTaken') + 1);
		}
	});

	var StudentController = new app.Controller({
		model: Student,
		elementId: 'student-container',
		template: '<span>{{name}} - {{age}}. Took {{examsTaken}} exams.</span><button id="student-exams-button">Increase exams taken</button>',
		clickHandlers: {
			'#student-exams-button': 'updateExams'
		},
		eventHandlers: {
			'changed:examsTaken' : 'render'
		},
		updateExams: function(){
			this.model.takeExam();
		}
	});
})();