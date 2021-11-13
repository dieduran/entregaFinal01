const Contenedor= require('../src/Contenedor')

const carritoContenedor= new Contenedor('carrito.txt')

/**
 * id
 * timestamp(carrito)
 * productos [{id timstamp(producto),nombre, descripcion, codigo, foto(url),precio,stock}]
 */

const nuevoCarrito= async (req, res) => {
    //const {timestamp=Date.now(),  nombre='', descripcion='', codigo='', foto='', precio=0,  stock=0 }= req.body
    const {timestamp=Date.now(), productos= [] }= req.body
    id= await carritoContenedor.save({timestamp, productos})
    res.json({id})
}


const eliminarCarrito =async(req, res) => {
    const id=parseInt(req.params.id)
    let salida=  await carritoContenedor.getById(id)
    if(!salida){
        return res.json({ error : 'carrito no encontrado' })
    }
    await carritoContenedor.deleteById(id)
    return res.json(salida);
}

const todosProductosCarrito= async(req, res) => {
    const idCarro=parseInt(req.params.id)
    let salida=  await carritoContenedor.getDetailProductoById(idCarro)
    if(!salida){
        return res.json({ error : 'carro no actualizado' })
    }
    return res.json(salida);
}


const agregarProductoCarroId =  async(req, res) => {
    const idCarro=parseInt(req.params.id)
    const {id,timestamp=Date.now(),nombre='',descripcion='', codigo='', foto='',precio=0,stock=0}= req.body
    const nuevoDetalleProducto= { id, timestamp, nombre, descripcion, codigo, foto, precio, stock}
    let salida=  await carritoContenedor.updateDetailProductoById(idCarro,nuevoDetalleProducto)
    if(!salida){
        return res.json({ error : 'carro no actualizado' })
    }
    return res.json(salida);
}

const eliminarProductoCarrito =async(req, res) => {
    const id=parseInt(req.params.id)
    const id_prod=parseInt(req.params.id_prod)
    let salida=  await carritoContenedor.getById(id)
    if(!salida){
        /* ahora borramos el item */
        return res.json({ error : 'carro no encontrado' })
    }
    await carritoContenedor.deleteDetailProductoById(id,id_prod)
    return res.json(salida);
}

module.exports={ nuevoCarrito,eliminarCarrito,todosProductosCarrito, agregarProductoCarroId, eliminarProductoCarrito}