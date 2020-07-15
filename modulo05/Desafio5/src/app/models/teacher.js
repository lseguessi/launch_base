const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback){

        db.query(`SELECT * FROM teachers ORDER BY name ASC`, function(err, results){
            if(err) throw 'Database error'

            callback(results.rows)
        })

    },

    create(data, callback){

        const query = `
        INSERT INTO teachers (
            avatar_url,
            name,
            birth_date,
            education_level,
            class_type,
            subjects_taught,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Data base error on create new item ${err}`

            callback(results.rows[0])
        })

    },

    show(id, callback){
        
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Data base error ${err}`

            callback(results.rows[0])
        })

    },

    update(data, callback){
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),
                birth_date=($3),
                education_level=($4),
                class_type=($5),
                subjects_taught=($6)
            WHERE id = $7    
        `
        const values = [
            data.avatar_url, 
            data.name, 
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Data base erro ${err}`

            callback()
        })

    },

    delete(id, callback){

        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database error ${err}`

                callback()
            })

    }

}