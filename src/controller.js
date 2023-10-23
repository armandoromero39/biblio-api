

import {pool} from './database.js';

class LibroController {

	async getAll(req, res) {

		try{
		const [result] = await pool.query('SELECT * FROM libros');
		res.json(result);
		}catch(error){
			console.log(error);
		}

	}

	async getOne(req, res){
		/*const libro = req.body; primer intento de getOne*/
		const libro = req.params.id;
		const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, libro);
		res.json(result);
	}

	

	async add(req, res){

		try{	
		const libro = req.body;
		const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, añopublicacion, isbn) VALUES  (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
		res.json({"Id insertado": result.insertId})
		}catch(error){
			console.log(error);
		}
	}
		
	
	async delete(req, res){
		const libro = req.body;
		const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`, [libro.isbn]);
		res.json({"Registros eliminados": result.affectedRows});
	}

		
	async update(req, res){
		const libro = req.body;
		const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn, libro.id]);
		res.json({"Registros actualizados": result.changedRows});
	}

}

	export const libro = new LibroController()






