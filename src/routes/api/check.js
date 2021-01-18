export async function post(req, res) {
  // check isValidSession
  const partnerName = req.session.partnerName;
  const state = req.session.state;

  if (state === 'BindingStateAgreement' && partnerName) {
    res.json({
      data: { partnerName },
      status: "00"
    })
  } else {
    res.json({
      data: {},
      status: "999"
    })
  }
}
