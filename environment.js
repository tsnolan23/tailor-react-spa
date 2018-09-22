const setConsul = (consulHost) => ({ consulHost })

const { env } = process
const {
	CONSUL_HOST
} = env

module.exports = ({
	...setConsul(CONSUL_HOST)
})
