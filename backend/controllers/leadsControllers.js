const Leadmodel = require("../models/leadsModels")

const leadsController = {
  async create(req, res) {
    try {
      const { name, email, mobile, city, state, field } = req.body;
      if (!name || !email || !mobile || !city || !state || !field) {
        return res.status(400).json({ flag: 0, msg: "All fields are required" });
      }
      const lead = new Leadmodel({ name, email, mobile, city, state, field });
      await lead.save();
      return res.status(201).json({ flag: 1, msg: "Lead created successfully", lead });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ flag: 0, msg: "Server error" });
    }
  },
  async read(req, res) {
    try {
      const leads = await Leadmodel.find().sort({ createdAt: -1 }); // latest first
      return res.status(200).json(leads);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ flag: 0, msg: "Server error" });
    }
  },
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

  async updateStatus(req, res) {
  try {
    const { id } = req.params;
    const lead = await Leadmodel.findById(id);

    if (lead) {
      await Leadmodel.updateOne(
        { _id: id },
        { $set: { status: !lead.status } }
      )
        .then(() => {
          res.status(200).json({
            msg: `Lead ${!lead.status ? "activated" : "deactivated"} successfully`,
            flag: 1,
          });
        })
        .catch((error) => {
          res.json({ msg: "Unable to update lead status", flag: 0 });
        });
    } else {
      res.json({ msg: "Lead not found", flag: 0 });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", flag: 0 });
  }
}


};

module.exports = leadsController;
