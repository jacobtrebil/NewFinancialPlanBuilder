import Plan from '../../../models/wizardSchema';
import dbConnect from '../../../util/wizardDbConnect';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function wizardGetApiRoute(req, res) {
    const { method } = req
    const id = req.query.id;

    await dbConnect();
    const userEmail = getSession(req, res).user.email

    switch (method) {
        case 'GET':
            try {
                const plan = await Plan.findOne({ _id: id })
                const { workAmount, volunteer, retirementAge, retirementIncome, charity, business, businessMoneyNeeded, care, majorPurchases, purchasesCost, support, supportCost, collegeSpendingAmount, kids, college, numberOfKids, currentEarnings, currentSavings, assetValue, increaseIncome, increaseIncomeAmount, outOfWork, lifeInsurance, taxPlan, investments, investmentsAmount, realEstate, realEstateAmount, alternativeAssets, alternativeAssetsAmount, otherAssets, otherAssetsAmount, powerOfAttorney, will, medicare, pension, pensionAmount, socialSecurity, socialSecurityAmount, mortgage, mortgageAmount, creditCardDebt, creditCardDebtAmount, medicalDebt, medicalDebtAmount, carFinancing, carFinancingAmount, studentLoans, studentLoanAmount, additionalDebt, additionalDebtAmount} = plan;
                res.status(200).json( { workAmount, volunteer, retirementAge, retirementIncome, charity, business, businessMoneyNeeded, care, majorPurchases, purchasesCost, support, supportCost, collegeSpendingAmount, kids, college, numberOfKids, currentEarnings, currentSavings, assetValue, increaseIncome, increaseIncomeAmount, outOfWork, lifeInsurance, taxPlan, investments, investmentsAmount, realEstate, realEstateAmount, alternativeAssets, alternativeAssetsAmount, otherAssets, otherAssetsAmount, powerOfAttorney, will, medicare, pension, pensionAmount, socialSecurity, socialSecurityAmount, mortgage, mortgageAmount, creditCardDebt, creditCardDebtAmount, medicalDebt, medicalDebtAmount, carFinancing, carFinancingAmount, studentLoans, studentLoanAmount, additionalDebt, additionalDebtAmount } )
                return;
            } catch (error) {
                console.log(error)
                res.status(400).json()
                return;
            }
            default:
            res.status(400).json()
            break
    }
})
