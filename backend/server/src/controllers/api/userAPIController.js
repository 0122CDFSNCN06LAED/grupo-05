const db = require("../../database/models");

const userAPIController = {

    list: (req, res) => {
        const page = Number(req.query.page) || 0;
        const pageSize = req.query.pageSize ?? 10;

        db.User.findAndCountAll({
            include: ["proyect"],
            limit: pageSize,
            offset: pageSize * page,
        }).then(({ count, rows }) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: count,
                    url: req.originalUrl,
                    hasNextPage: (page + 1) * pageSize < count,
                    hasPrevPage: page > 0,
                },
                data: rows,
            };
            res.json(respuesta);
        });
    },

    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: ["proyect"],
        }).then((User) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: proyect.length,
                    url: req.originalUrl,
                },
                data: movie,
            };
            res.json(respuesta);
        });
    },
};