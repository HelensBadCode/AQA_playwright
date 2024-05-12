import {test, expect} from "../../../src/fixtures/userLogInStateFixture.js";
import {PROFILE_DATA_RESPONSE} from "../../../src/pageObjects/ProfilePage/fixtures/profile_data.js";


test.describe('Profile (network)', async () => {
    test('Should mock response body for profile request', async ({garagePage, page}) => {
        await page.route('/api/users/profile', async (route)=>{
            return route.fulfill({
                status: 200,
                body: JSON.stringify(PROFILE_DATA_RESPONSE)
            })
        })
        const sideBar = await garagePage.sideBar;
        const profilePage = await sideBar.openProfilePage();
        await expect(profilePage.titleProfilePage).toHaveText('Profile');
        await expect(profilePage.editProfileButton).toBeVisible();
        await expect(profilePage.profileFullName).toHaveText(`${PROFILE_DATA_RESPONSE.data.name} ${PROFILE_DATA_RESPONSE.data.lastName}`);


        // await page.pause();
    });
})