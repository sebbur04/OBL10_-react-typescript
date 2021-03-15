import { pool } from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
}

class StudentService {
  getStudents(success: (students: Student[]) => void) {
    pool.query('SELECT * FROM Students', (error, results: RowDataPacket[]) => {
      if (error) return console.error(error);

      success(results as Student[]);
    });
  }

  getStudent(id: number, success: (student: Student) => void) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results: RowDataPacket[]) => {
      if (error) return console.error(error);

      success(results[0] as Student);
    });
  }

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error) => {
        if (error) return console.error(error);

        success();
      },
    );
  }
}
export let studentService = new StudentService();
