import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import type { PassDapp, PassDapp__factory } from "../typechain-types";
describe("PassDapp", function () {
  let passDapp: PassDapp;
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPassDappFixture() {
    const [owner] = await ethers.getSigners();

    const PassDapp = (await ethers.getContractFactory(
      "PassDapp",
      owner
    )) as PassDapp__factory;
    passDapp = await PassDapp.deploy();

    return passDapp;
  }

  function getCredential(name: string, site: string, secret: string) {
    const _credential: PassDapp.CredentialStruct = {
      name,
      site,
      secret,
    };

    return _credential;
  }

  function compareCredentials(
    a: PassDapp.CredentialStruct,
    b: PassDapp.CredentialStruct
  ) {
    expect(a.name).to.equal(b.name);
    expect(a.site).to.equal(b.site);
    expect(a.secret).to.equal(b.secret);
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      passDapp = await loadFixture(deployPassDappFixture);
      const [owner] = await ethers.getSigners();
      const actualOwner: string = await passDapp.signer.getAddress();

      expect(actualOwner).to.equal(owner.address);
    }).timeout(10000);
  }).timeout(10000);

  describe("Credentials manipulation", function () {
    it("Should add a credential", async function () {
      passDapp = await loadFixture(deployPassDappFixture);

      const credential1 = getCredential("google", "google.com", "password123");
      const credential2 = getCredential("google2", "google2.com", "password");

      await passDapp.addCredential(credential1);
      await passDapp.addCredential(credential2);

      const actualCredentials: PassDapp.CredentialStructOutput[] =
        await passDapp.getAllCredentials();

      expect(actualCredentials.length).to.equal(2);

      compareCredentials(actualCredentials[0], credential1);

      compareCredentials(actualCredentials[1], credential2);
    }).timeout(10000);

    it("Should remove a credential", async function () {
      passDapp = await loadFixture(deployPassDappFixture);

      const credential = getCredential("google", "google.com", "password123");
      const credential2 = getCredential("google2", "google2.com", "password");

      await passDapp.addCredential(credential);
      await passDapp.addCredential(credential2);
      await passDapp.deleteCredential(0);

      const actualCredentials: PassDapp.CredentialStructOutput[] =
        await passDapp.getAllCredentials();

      expect(actualCredentials.length).to.equal(1);
      compareCredentials(actualCredentials[0], credential2);
    }).timeout(10000);

    it("Should update a credential", async function () {
      passDapp = await loadFixture(deployPassDappFixture);

      const credential = getCredential("google", "google.com", "password123");
      await passDapp.addCredential(credential);

      const credential2 = getCredential("google2", "google2.com", "password");
      await passDapp.updateCredential(0, credential2);

      const actualCredentials: PassDapp.CredentialStructOutput[] =
        await passDapp.getAllCredentials();

      expect(actualCredentials.length).to.equal(1);
      compareCredentials(actualCredentials[0], credential2);
    }).timeout(10000);
  });

  describe("Credentials reverts check", function () {
    it("Should revert when deleting a credential with wrong index", async function () {
      passDapp = await loadFixture(deployPassDappFixture);

      const credential = getCredential("google", "google.com", "password123");
      await passDapp.addCredential(credential);
      await expect(passDapp.deleteCredential(1)).to.be.reverted;
      await expect(passDapp.deleteCredential(1)).to.be.revertedWithCustomError(
        passDapp,
        "IndexError"
      );
    });

    it("Should revert when updating a credential with wrong index", async function () {
      passDapp = await loadFixture(deployPassDappFixture);

      const credential = getCredential("google", "google.com", "password123");
      await passDapp.addCredential(credential);
      await expect(passDapp.updateCredential(1, credential)).to.be.reverted;
      await expect(
        passDapp.updateCredential(1, credential)
      ).to.be.revertedWithCustomError(passDapp, "IndexError");
    });
  }).timeout(10000);
});
