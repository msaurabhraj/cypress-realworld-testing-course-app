// Define the HomePageActions class
class HomePageActions {
  visit() {
    cy.visit("http://localhost:3000");
  }

  startCourse(courseIndex) {
    cy.getByData(`course-${courseIndex}`).find("a").contains('Get started').click();
  }
}

// Define the CoursePageActions class
class CoursePageActions {
  verifyCoursePath(coursePath) {
    cy.location("pathname").should("equal", coursePath);
  }

  goToNextLesson() {
    cy.getByData("next-lesson-button").click();
  }

  verifyLessonPath(lessonPath) {
    cy.location("pathname").should("equal", lessonPath);
  }

  selectChallengeAnswer(answerIndex) {
    cy.getByData(`challenge-answer-${answerIndex}`).click();
  }

  completeCourse() {
    cy.getByData("next-lesson-button").should("exist").contains("Complete Course").click();
  }
}

// Export both classes
export { HomePageActions, CoursePageActions };