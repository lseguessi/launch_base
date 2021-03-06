const db = require('../../config/db')
const { date, grade } = require('../../lib/utils')

module.exports = {

    all(callback){

        db.query(`SELECT * FROM students ORDER BY name ASC`, function(err, results){
            if(err) throw 'Database error'

            callback(results.rows)
        })

    },

    create(data, callback){
 
        const query = `
        INSERT INTO students (
            avatar_url,
            name,
  			email,
            birth_date,
            class_year,
            hours,
            created_at,
            teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            grade(data.class_year),
            data.hours,
            date(Date.now()).iso,
            data.teacher
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Data base error on create new item ${err}`

            callback(results.rows[0])
        })

    },

    show(id, callback){
        
        db.query(`SELECT * FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Data base error ${err}`

            callback(results.rows[0])
        })

    },

    update(data, callback){
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth_date=($4),
                class_year=($5),
                hours=($6),
                teacher_id=($7)
            WHERE id = $8
        `
        const values = [
            data.avatar_url, 
            data.name,
            data.email,
            date(data.birth_date).iso,
            grade(data.class_year),
            data.hours,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Data base erro ${err}`

            callback()
        })

    },

    delete(id, callback){

        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database error ${err}`

                callback()
            })

    },

    teacherSelectOption(callback){
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    }

}