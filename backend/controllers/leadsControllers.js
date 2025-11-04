const Leadmodel = require("../models/leadsModels");

const leadsController = {
  // ✅ Create a new lead
  async create(req, res) {
    try {
      const {
        name,
        email,
        mobile,
        leadLinePhone,
        shopName,
        city,
        state,
        pinCode,
      } = req.body;

      // ✅ Validate all required fields
      if (
        !name ||
        !email ||
        !mobile ||
        !leadLinePhone ||
        !shopName ||
        !city ||
        !state ||
        !pinCode
      ) {
        return res.status(400).json({ flag: 0, msg: "All fields are required" });
      }

      // ✅ Check for duplicate entries (unique fields)
      const existingLead = await Leadmodel.findOne({
        $or: [{ email }, { mobile }, { leadLinePhone }, { shopName }],
      });

      if (existingLead) {
        return res.status(400).json({
          flag: 0,
          msg: "Email, Mobile, Lead Line Phone, or Shop Name already exists",
        });
      }

      // ✅ Create new lead
      const lead = new Leadmodel({
        name,
        email,
        mobile,
        leadLinePhone,
        shopName,
        city,
        state,
        pinCode,
      });

      await lead.save();

      return res
        .status(201)
        .json({ flag: 1, msg: "Lead created successfully", lead });
    } catch (error) {
      console.error("Error creating lead:", error);
      return res.status(500).json({ flag: 0, msg: "Server error" });
    }
  },

  // ✅ Get all leads
  async read(req, res) {
    try {
      const leads = await Leadmodel.find().sort({ createdAt: -1 });
      return res.status(200).json(leads);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ flag: 0, msg: "Server error" });
    }
  },

  // ✅ Delete a lead
  async delete(req, res) {
    try {
      const { id } = req.params;
      const lead = await Leadmodel.findByIdAndDelete(id);

      if (!lead) {
        return res.status(404).json({ flag: 0, msg: "Lead not found" });
      }

      return res
        .status(200)
        .json({ flag: 1, msg: "Lead deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ flag: 0, msg: "Server error" });
    }
  },

  // ✅ Update lead status (active/inactive)
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const lead = await Leadmodel.findById(id);

      if (lead) {
        await Leadmodel.updateOne(
          { _id: id },
          { $set: { status: !lead.status } }
        );
        res.status(200).json({
          msg: `Lead ${!lead.status ? "activated" : "deactivated"} successfully`,
          flag: 1,
        });
      } else {
        res.status(404).json({ msg: "Lead not found", flag: 0 });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error", flag: 0 });
    }
  },
};

module.exports = leadsController;
