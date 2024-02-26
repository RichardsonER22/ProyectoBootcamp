import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'azle';

type Medicamento = {
    id: number,
    nombre: string,
    marca: string,
    viaAdmin: string,
    fechaCad: string,
    lote: string,
    contenido: string;
}

//Arreglo para medicamentos
let medicamentos: Medicamento[] = [{
    id: 1,
    nombre: "Paracetamol",
    marca: "Silk",
    viaAdmin: "a",
    fechaCad: "20-12-2025",
    lote: "122412",
    contenido: "20 tabletas"
}]


// VENTAS
type Venta = {
    id: number,
    nombre: string,
    marca: string;
    fecha: string;
    precio: number;
    cantidad: number;
    descuento: string;
    cliente: number;
    iva: string;
    metodoPago: string;
    direccionEnvio: string;
    numeroSeguimiento: number;
}
//Arreglo para ventas
let ventas: Venta[] = [{
    id: 1,
    nombre: "Paracetamol",
    marca: "Silk",
    fecha: "2024-02-24",
    precio: 100,
    cantidad: 3,
    descuento: "10%",
    cliente: 25,
    iva: "16%",
    metodoPago: "targeta",
    direccionEnvio: "san nicolas #211",
    numeroSeguimiento: 1234567890,

}]


// Empleados
type Empleado = {
    id: number,
    nombre: string,
    usuario: string,
    password: string,
    correo: string,
    telefono: string
}

//Arreglo para empleados
let empleados: Empleado[] = [{
    id: 1,
    nombre: "juan",
    usuario: 'juan1232',
    password: '12',
    correo: '@gmail',
    telefono: '5555555'
}]


// Proveedores
type Proveedor = {
    id: number,
    direccion: string,
    contacto: string,
    numFiscal: string,
}

// Arreglo de proveedores
let proveedores: Proveedor[] = [{
    id: 321,
    direccion: 'Aguascalientes',
    contacto: '496-431-4323',
    numFiscal: 'AAA123456123',
}];




export default Server(() => {
    const app = express();
    app.use(express.json());

    // Middleware para validar si ya existe un medicamento con el mismo nombre
    function validateMedicamentoId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (medicamentos.some(medicamento => medicamento.id === id)) {
            return res.status(400).json({ error: 'Ya existe un medicamento con este ID' });
        }
        next();
    }

    // GET
    app.get("/medicamentos", (req, res) => {
        res.json(medicamentos);
    });

    // POST
    app.post("/medicamentos", validateMedicamentoId, (req, res) => {
        const newMedicamento: Medicamento = req.body;
        medicamentos.push(newMedicamento);
        res.send("Registro correcto");
    });

    // UPDATE
    app.put("/medicamentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const medicamento = medicamentos.find((medicamento) => medicamento.id === id);
        if (!medicamento) {
            res.status(404).send("No existe el medicamento");
            return;
        }
        const updatedMedicamento = { ...medicamento, ...req.body };
        medicamentos = medicamentos.map((m) => m.id === updatedMedicamento.id ? updatedMedicamento : m);
        res.send("Actualizado correctamente");
    });

    // DELETE
    app.delete("/medicamentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        medicamentos = medicamentos.filter((medicamento) => medicamento.id !== id);
        res.send("Eliminado correctamente");
    });


    function validateVentaId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (ventas.some(venta => venta.id === id)) {
            return res.status(400).json({ error: 'Ya existe una venta con este ID' });
        }
        next();
    }


    //VENTAS


    // GET
    app.get("/ventas", (req, res) => {
        res.json(ventas);
    });

    // POST
    app.post("/ventas", validateVentaId, (req, res) => {
        const newVenta: Venta = req.body;
        ventas.push(newVenta);
        res.send("Registro correcto");
    });

    // UPDATE
    app.put("/ventas/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const venta = ventas.find((venta) => venta.id === id);
        if (!venta) {
            res.status(404).send("No existe la venta");
            return;
        }
        const updatedVenta = { ...venta, ...req.body };
        ventas = ventas.map((m) => m.id === updatedVenta.id ? updatedVenta : m);
        res.send("Actualizado correctamente");
    });

    // DELETE
    app.delete("/ventas/:id", (req, res) => {
        const id = parseInt(req.params.id);
        ventas = ventas.filter((venta) => venta.id !== id);
        res.send("Eliminado correctamente");
    });


    //EMPLEADOS

    // Middleware para validar si ya existe un empleado con el mismo ID
    function validateEmpleadoId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (empleados.some(empleado => empleado.id === id)) {
            return res.status(400).json({ error: 'Ya existe un empleado con este ID' });
        }
        next();
    }

    // GET
    app.get("/empleados", (req, res) => {
        res.json(empleados);
    });

    // POST
    app.post("/empleados", validateEmpleadoId, (req, res) => {
        const newEmpleado: Empleado = req.body;
        empleados.push(newEmpleado);
        res.send("Registro correcto");
    });

    // UPDATE
    app.put("/empleados/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const empleado = empleados.find((empleado) => empleado.id === id);
        if (!empleado) {
            res.status(404).send("No existe el empleado");
            return;
        }
        const updatedEmpleado = { ...empleado, ...req.body };
        empleados = empleados.map((m) => m.id === updatedEmpleado.id ? updatedEmpleado : m);
        res.send("Actualizado correctamente");
    });

    // DELETE
    app.delete("/empleados/:id", (req, res) => {
        const id = parseInt(req.params.id);
        empleados = empleados.filter((empleado) => empleado.id !== id);
        res.send("Eliminado correctamente");
    });



    //PROVEEDORES

    // Middleware para validar si ya existe un proveedor con el mismo ID
    function validateProvId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;
        if (proveedores.some(prov => prov.id === id)) {
            return res.status(400).json({ error: 'Ya existe un proveedor con este ID' });
        }
        next();
    }


    // GET para obtener proveedores
    app.get("/proveedores", (req, res) => {
        res.json(proveedores);
    });

    // POST para agregar un nuevo proveedor
    app.post("/proveedores", validateProvId, (req, res) => {
        const newProv: Proveedor = req.body;
        proveedores.push(newProv);
        res.send("Registro correcto");
    });
    // PUT para actualizar un proveedor
    app.put("/proveedores/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const provIndex = proveedores.findIndex(prov => prov.id === id);
        if (provIndex === -1) {
            res.status(404).send("No se encontró el proveedor");
            return;
        }
        proveedores[provIndex] = { ...proveedores[provIndex], ...req.body };
        res.send("Actualizado correctamente");
    });

    // DELETE para eliminar un proveedor
    app.delete("/proveedores/:id", (req, res) => {
        const id = parseInt(req.params.id);
        proveedores = proveedores.filter(prov => prov.id !== id);
        res.send("Eliminado correctamente");
    });

    return app.listen();
});
