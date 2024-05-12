# Quiz app

## Overview
This web app is designed for practicing learned content through quizzes. Users can create topics, add questions, and answer them. It also provides basic statistics. The app follows a three-tier architecture (client, server, database) and uses Deno with Oak.

## Features
- **Main Page**: Contains stats and links for registration and login.
- **Navigation**: Easy navigation with links to topics and quizzes.
- **Topics**: Admins can add and delete topics.
- **Questions**: Users can add, view, and delete questions.
- **Registration and Login**: Users can register and login.
- **Quiz**: Users can take quizzes on selected topics.
- **API**: Provides endpoints for retrieving random questions and submitting answers.

## Online Deployment
- App deployed at [[link](https://quiz-app-4lro.onrender.com/)].

## Dependencies
- Oak: Web framework for Deno.
- bcrypt: Password hashing.
- PostgreSQL: Database.
- Flyway: Database migrations.
- Bootstrap: CSS framework.

## License
This project is licensed under the [Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) License - see the [LICENSE.md](LICENSE.md) file for details.

By contributing to this project, you agree that your contributions will be licensed under the Creative Commons Zero v1.0 Universal License.

### Aalto Course
This project was completed as part of the Aalto Web Software Development course.