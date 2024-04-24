const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
    let Storage;
    let storage: any;

    beforeEach(async function () {
        Storage = await ethers.getContractFactory("Storage");
        storage = await Storage.deploy({ gasLimit: 9000000 });
        await storage.waitForDeployment();
    });

    it("Should return the right owner", async function () {
        const [owner] = await ethers.getSigners();
        expect(await storage.isOwner(owner.address)).to.equal(true);
    });

    it("Should return false if not the owner", async function () {
        const [, nonOwner] = await ethers.getSigners();
        expect(await storage.isOwner(nonOwner.address)).to.equal(false);
    });
});
