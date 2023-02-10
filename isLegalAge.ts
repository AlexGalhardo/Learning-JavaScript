class Validator {
	static calculateAge (birthday: string): number {
		const birthdayData = new Date(birthday)
		const ageDifMs = Date.now() - birthdayData.getTime()
		const ageDate = new Date(ageDifMs)
		return Math.abs(ageDate.getUTCFullYear() - 1970)
	}
}

console.log('calculateAge => ', Validator.calculateAge('03/23/1995'))