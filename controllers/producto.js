const Contenedor= require('../src/Contenedor')

const productosContenedor= new Contenedor('productos.txt')

const todosProductos= async(req, res) => {
    res.json(await productosContenedor.getAll());
}

const productoPorId =  async(req, res) => {
    const id=parseInt(req.params.id)
    let salida=  await productosContenedor.getById(id)
    if(!salida){
        return res.json({ error : 'producto no encontrado' })
    }
    return res.json(salida);
}

const nuevoProducto= async (req, res) => {
    // if (USRADMINISTRADOR===false){
    //     res.json({ error: -3, descripcion: `opcion solo valida para administradores.`});
    //     return
    // }
    const {timestamp=Date.now(),  nombre='', descripcion='', codigo='', foto='', precio=0,  stock=0 }= req.body
    id= await productosContenedor.save({timestamp,  nombre, descripcion, codigo, foto, precio,  stock})
    res.json({id})
}

const actualizarProducto = async(req, res) => {
    const id=parseInt(req.params.id)
    const {timestamp=Date.now(),  nombre='', descripcion='', codigo='', foto='', precio=0,  stock=0 }= req.body
    let salida=  await  productosContenedor.getById(id) 
    if(!salida){
        return res.json({ error : 'producto no encontrado' })
    }
    const rtaId=await productosContenedor.updateById({id, timestamp,  nombre, descripcion, codigo, foto, precio,  stock})
    return res.json({id: rtaId})
}

const eliminarProducto =async(req, res) => {
    const id=parseInt(req.params.id)
    let salida=  await productosContenedor.getById(id)
    if(!salida){
        return res.json({ error : 'producto no encontrado' })
    }
    await productosContenedor.deleteById(id)
    return res.json(salida);
}

module.exports={todosProductos,productoPorId,nuevoProducto, actualizarProducto, eliminarProducto}