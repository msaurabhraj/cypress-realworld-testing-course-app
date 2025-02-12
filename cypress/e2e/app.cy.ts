import HomePage from "./pages/spec.cy"
import NewsletterPage from './pages/subscribe.cy'
import { HomePageActions, CoursePageActions } from './pages/user-journey.cy';

// Define course data as a constant
const COURSES = {
  firstCourse: {
    index: 0,
    name: 'Testing Your First Next.js Application',
    route: '/testing-your-first-application',
    lessons: [
      '/testing-your-first-application/app-install-and-overview',
      '/testing-your-first-application/installing-cypress-and-writing-our-first-test',
      '/testing-your-first-application/setting-up-data-before-each-test'
    ]
  },
  secondCourse: {
    index: 1,
    name: 'Testing Foundations',
    route: '/testing-foundations',
    lessons: [
      '/testing-foundations/testing-is-a-mindset',
      '/testing-foundations/knowing-what-to-test',
      '/testing-foundations/manual-vs-automated-testing'
    ]
  }
}

describe('Application Tests', () => {
  // Home Page Test Suite
  context('Home Page', () => {
    beforeEach(() => {
      HomePage.visit()
    })

    it('verifies hero section heading', () => {
      HomePage.verifyHeroHeading()
    })

    it('verifies homepage features', () => {
      HomePage.verifyFeatures()
    })

    // Parameterized course navigation tests
    Object.entries(COURSES).forEach(([courseName, courseData]) => {
      it(`navigates to ${courseData.name}`, () => {
        HomePage.navigateToCourse(courseData.index, courseData.route)
      })
    })
  })

  // Newsletter Subscription Test Suite
  context('Newsletter Subscription', () => {
    const testCases = [
      { 
        name: 'allows valid email subscription', 
        email: 'tom@aol.com',
        expectSuccess: true 
      },
      { 
        name: 'prevents invalid email subscription', 
        email: 'tom',
        expectSuccess: false 
      },
      { 
        name: 'handles already subscribed email', 
        email: 'john@example.com',
        expectSuccess: false 
      }
    ]

    beforeEach(() => {
      NewsletterPage.visit()
    })

    testCases.forEach(testCase => {
      it(testCase.name, () => {
        NewsletterPage.subscribeNewsletter(testCase.email, { 
          expectSuccess: testCase.expectSuccess 
        })
      })
    })
  })


  // User Journey Test Suite
  describe("User Journey", () => {
    const homePage = new HomePageActions();
    const coursePage = new CoursePageActions();
    beforeEach(() => {
        HomePage.visit()
      })

    it("a user can find a course on the home page and complete the courses lessons", () => {
      homePage.startCourse(COURSES.firstCourse.index);

      coursePage.verifyCoursePath(COURSES.firstCourse.route);

      COURSES.firstCourse.lessons.forEach((lessonPath, index) => {
        coursePage.goToNextLesson();
        coursePage.verifyLessonPath(lessonPath);
        coursePage.selectChallengeAnswer(0);
      });

      coursePage.completeCourse();
      coursePage.verifyCoursePath("/");
    });

    it("a user can find a course on the home page and complete the second courses lessons", () => {
        homePage.startCourse(COURSES.secondCourse.index);
  
        coursePage.verifyCoursePath(COURSES.secondCourse.route);
  
        COURSES.secondCourse.lessons.forEach((lessonPath, index) => {
          coursePage.goToNextLesson();
          coursePage.verifyLessonPath(lessonPath);
          coursePage.selectChallengeAnswer(0);
        });
  
        coursePage.completeCourse();
        coursePage.verifyCoursePath("/");
      });
  });

  // Error Handling and Logging
  afterEach(function() {
    // Log test details on failure
    if (this.currentTest?.state === 'failed') {
      cy.log(`Test Failed: ${this.currentTest.title}`)
      cy.screenshot(`test-failure-${Date.now()}`)
    }
  })
})