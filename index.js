import {inquirer} from "inquirer";
import { Command } from "commander";
import fs from 'fs/promises'; // Use fs/promises for async file operations

const program = new Command();

program
  .command('list')
  .alias('l')
  .description('List a course')
  .argument('<title>', 'Course title to view or add')
  .action(async (title) => { // Make action async to use await
    try {
      const filePath = './users.json';
      let courses = [];

      // Read file asynchronously
      let data;
      try {
        data = await fs.readFile(filePath, 'utf-8');
      } catch (err) {
        console.error('Error reading file:', err.message);
        return;
      }

      if (data) {
        courses = JSON.parse(data);
      }

      // Check if the course is already present
      const course = courses.find(item => item.title === title);

      if (course) {
        console.log("Course found");
        console.table(JSON.parse(data));
        console.table(course);
      } else {
        console.log("Course not found");

        // Prompt user to add a new course
        const { add } = await inquirer.prompt([
          {
            type: "list",
            name: "add",
            message: "Add this course?",
            choices: ['yes', 'no']
          }
        ]);

        if (add === 'yes') {
          const { price } = await inquirer.prompt([{
            type: "input",
            name: 'price',
            message: "What is the price of the new course?"
          }]);

          const newCourse = {
            title: title,
            price: price
          };

          // Add new course to the array
          courses.push(newCourse);

          // Write updated array back to file
          try {
            await fs.writeFile(filePath, JSON.stringify(courses, null, 2), 'utf8');
            console.log(`Successfully added ${title} course`);
          } catch (err) {
            console.error("Error writing file:", err.message);
          }
        } else {
          console.log("Course not added");
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  });

program.parse(process.argv);
