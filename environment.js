const setConsul = (consulAddress) => ({ consulAddress })

const { env } = process
const {
	CONSUL_HOST
} = env

module.exports = ({
	...setConsul(CONSUL_HOST)
})
